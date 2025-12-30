import simpleRestProvider from "ra-data-simple-rest";
import store from "../../redux/store";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api/v1";

const simpleProvider = simpleRestProvider(baseUrl);

function mapId(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(mapId);
  }
  if (obj && typeof obj === "object") {
    let mapped = { ...obj };
    if (mapped._id && !mapped.id) {
      mapped.id = mapped._id;
    }
    // Remove _id field after mapping to id
    if ("_id" in mapped) {
      delete mapped._id;
    }
    // Special case: if categoryId is an object with _id, map to categoryId._id
    if (mapped.categoryId && typeof mapped.categoryId === "object" && mapped.categoryId._id) {
      mapped.categoryId = mapped.categoryId._id;
    }
    // Remove __v field
    if ("__v" in mapped) {
      delete mapped.__v;
    }
    return mapped;
  }
  return obj;
}

// Custom dataProvider that strips query params for GET_LIST and similar methods
const customDataProvider = {
  ...simpleProvider,
  getList: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    // Build query string for pagination, sorting, and filters
    const { page, perPage } = params.pagination || {};
    const { field, order } = params.sort || {};
    const query: any = {
      page,
      limit: perPage,
    };
    if (field) query.sortBy = field === "id" ? "_id" : field;
    if (order) query.sortOrder = order === "ASC" ? "asc" : order === "DESC" ? "desc" : order;
    // Add filters
    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        query[key] = value;
      });
    }
    const queryString = Object.entries(query)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`)
      .join("&");
    return fetch(`${baseUrl}/${resource}?${queryString}`, {
      headers: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
      }
    })
      .then(response => response.json())
      .then(data => {
        // Support backend response: { meta: { total }, data: [...] }
        const items = Array.isArray(data) ? data : (data.data || []);
        const mappedItems = mapId(items);
        const total =
          (data.meta && typeof data.meta.total === "number")
            ? data.meta.total
            : (Array.isArray(data) ? data.length : (data.total || items.length || 0));
        return {
          data: mappedItems,
          total,
        };
      });
  },
  getOne: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    return fetch(`${baseUrl}/${resource}/${params.id}`, {
      headers: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
      }
    }).then(response => response.json())
      .then(item => {
        // If backend response is wrapped in { data: ... }, extract it
        const actual = item && item.data ? item.data : item;
        return { data: mapId(actual) };
      });
  },
  getMany: (resource: string, params: any) => {
    // TEMP DEBUG: Log resource and params for getMany
    // eslint-disable-next-line no-console
    console.log("ReactAdmin getMany resource:", resource, "params:", params);
    const accessToken = store.getState().user?.accessToken;
    const ids = params.ids.join(",");
    return fetch(`${baseUrl}/${resource}?ids=${ids}`, {
      headers: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
      }
    }).then(response => response.json())
      .then(items => {
        // If backend response is wrapped in { data: ... }, extract it
        let arr = items && items.data ? items.data : items;
        // If not an array, wrap in array
        if (!Array.isArray(arr)) arr = [arr];
        return { data: mapId(arr) };
      });
  },
  getManyReference: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    return fetch(`${baseUrl}/${resource}`, {
      headers: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
      }
    }).then(response => response.json())
      .then(data => {
        const items = Array.isArray(data) ? data : (data.data || []);
        const mappedItems = mapId(items);
        return {
          data: mappedItems,
          total: Array.isArray(data) ? data.length : (data.total || items.length || 0),
        };
      });
  },
  create: async (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    let data = { ...params.data };

    // Handle image upload for react-admin's ImageInput (productImage, categoryImage, addonImage)
    const imageField =
      resource === "products"
        ? "productImage"
        : resource === "categories"
        ? "categoryImage"
        : resource === "addons"
        ? "addonImage"
        : null;

    if (imageField && data[imageField] && data[imageField].rawFile instanceof File) {
      const formData = new FormData();
      formData.append("file", data[imageField].rawFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
      );
      // Optionally set folder
      if (resource === "products") formData.append("folder", "product");
      if (resource === "categories") formData.append("folder", "category");
      if (resource === "addons") formData.append("folder", "addons");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const cloudinaryData = await res.json();
      if (cloudinaryData.secure_url) {
        data[imageField] = cloudinaryData.secure_url;
      } else {
        data[imageField] = "";
      }
    }

    // Ensure price is a number if present
    if (typeof data.price !== "undefined") {
      data.price = Number(data.price);
      if (isNaN(data.price)) data.price = 0;
    }

    // Transform availability to array of strings if needed
    if (
      Array.isArray(data.availability) &&
      data.availability.length > 0 &&
      typeof data.availability[0] === "object" &&
      "value" in data.availability[0]
    ) {
      data.availability = data.availability.map((item: any) => item.value);
    }

    return fetch(`${baseUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((item) => {
        const actual = item && item.data ? item.data : item;
        return { data: mapId(actual) };
      });
  },
  update: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    let data = { ...params.data };

    // Ensure price is a number if present
    if (typeof data.price !== "undefined") {
      data.price = Number(data.price);
      if (isNaN(data.price)) data.price = 0;
    }

    // Transform availability to array of strings if needed
    if (
      Array.isArray(data.availability) &&
      data.availability.length > 0 &&
      typeof data.availability[0] === "object" &&
      "value" in data.availability[0]
    ) {
      data.availability = data.availability.map((item: any) => item.value);
    }

    return fetch(`${baseUrl}/${resource}/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((item) => {
        const actual = item && item.data ? item.data : item;
        return { data: mapId(actual) };
      });
  },
  updateMany: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    return Promise.all(
      params.ids.map((id: string) =>
        fetch(`${baseUrl}/${resource}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
          },
          body: JSON.stringify(params.data)
        }).then(response => response.json())
      )
    ).then(items => ({
      data: mapId(items)
    }));
  },
  delete: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    return fetch(`${baseUrl}/${resource}/${params.id}`, {
      method: "DELETE",
      headers: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
      }
    }).then(async response => {
      if (response.status === 204) {
        // No content, return previousData or empty object
        return { data: params.previousData || {} };
      }
      const item = await response.json();
      return { data: mapId(item) };
    });
  },
  deleteMany: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    return Promise.all(
      params.ids.map((id: string, idx: number) =>
        fetch(`${baseUrl}/${resource}/${id}`, {
          method: "DELETE",
          headers: {
            ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
          }
        }).then(async response => {
          if (response.status === 204) {
            // No content, return previousData or id
            return params.previousData ? params.previousData[idx] : { id };
          }
          const item = await response.json();
          return mapId(item);
        })
      )
    ).then(items => ({
      data: items
    }));
  },
};

export { customDataProvider };
