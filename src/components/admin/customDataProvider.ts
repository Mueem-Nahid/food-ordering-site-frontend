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
    // Special case: if categoryId is an object with _id, map to categoryId._id
    if (mapped.categoryId && typeof mapped.categoryId === "object" && mapped.categoryId._id) {
      mapped.categoryId = mapped.categoryId._id;
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
    // TEMP DEBUG: Log the accessToken being sent
    // Remove this after debugging
    // eslint-disable-next-line no-console
    console.log("ReactAdmin customDataProvider accessToken:", accessToken);
    return fetch(`${baseUrl}/${resource}`, {
      headers: {
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
      }
    })
      .then(response => response.json())
      .then(data => {
        const items = Array.isArray(data) ? data : (data.data || []);
        const mappedItems = mapId(items);
        return {
          data: mappedItems,
          total: Array.isArray(data) ? data.length : (data.total || items.length || 0),
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
        // TEMP DEBUG: Log the raw response from backend for create
        // eslint-disable-next-line no-console
        console.log("ReactAdmin create raw response:", item);
        return { data: mapId(item) };
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
  create: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    return fetch(`${baseUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
      },
      body: JSON.stringify(params.data)
    }).then(response => response.json())
      .then(item => {
        // If backend response is wrapped in { data: ... }, extract it
        const actual = item && item.data ? item.data : item;
        return { data: mapId(actual) };
      });
  },
  update: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    return fetch(`${baseUrl}/${resource}/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
      },
      body: JSON.stringify(params.data)
    }).then(response => response.json())
      .then(item => ({
        data: mapId(item)
      }));
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
    }).then(response => response.json())
      .then(item => ({
        data: mapId(item)
      }));
  },
  deleteMany: (resource: string, params: any) => {
    const accessToken = store.getState().user?.accessToken;
    return Promise.all(
      params.ids.map((id: string) =>
        fetch(`${baseUrl}/${resource}/${id}`, {
          method: "DELETE",
          headers: {
            ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {})
          }
        }).then(response => response.json())
      )
    ).then(items => ({
      data: mapId(items)
    }));
  },
};

export { customDataProvider };
