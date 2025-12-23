# KFC React to Next.js Migration Todo

## Files to Migrate

**Components:**
- Hero.js, HeroSkeleton.js, ProductPageSkeleton.js, TopSelling.js
- cart/: CartItem.js, CartProdItem.js, ProceedToCheckout.js
- checkout/: ConfirmOrder.js, DeliveryDetails.js, OrderItem.js, OrderSummary.js, OrderTotal.js, PaymentMethAvailable.js, PaymentMethod.js, PhoneNumber.js
- commons/: AddonCard.js, AddonItem.js, AutoComplete.js, Box.js, Card.js, Drawer.js, Footer.js, Header.js, LanguageSwitch.js, Map.js, Modal.js, RadioBtn.js, SignOutBtn.js, SoftDrinkCard.js, SoftDrinkItem.js, Spinner.js, Stepper.js, Tags.js, TopBar.js
- deals/: CatergoryPageSkeleton.js, DealsCard.js, DealSection.js, DealSkeleton.js
- MyKFC/: Accordin.js, Favourites.js, FavouritesCard.js, MyKfcAddLocation.js, MyKfcLocationItem.js, MyKfcLocations.js, MyKfcPersonalInfo.js, MyKFCSkeleton.js, OrderHistoryItem.js, PastOrders.js

**Pages:**
- Cart.js, CategoryPage.js, Checkout.js, Fail.js, Home.js, Login.js, MyKfc.js, OrderHistory.js, Product.js, Success.js

**Context:**
- addonContext.js, addonState.js, dealContext.js, dealState.js, favContext.js, locationContext.js, locationState.js, paymentContext.js, paymentState.js, softDrinkContext.js, softDrinkState.js, userContext.js, userState.js

**Assets:**
- All images in images/ (e.g., 1.png, 2.png, ..., KFC-Logo-Red.png, login.gif, etc.)

**Redux:**
- store.js, redux/cart/cartSlice.js

- [ ] Analyze KFC React app structure and dependencies
- [x] List all components, pages, contexts, and assets to migrate
- [x] Map React Router pages to Next.js pages

## Route Mapping

| React Router Path      | Next.js App Directory Page         |
|----------------------- |------------------------------------|
| /                     | src/app/page.tsx                   |
| /success              | src/app/success/page.tsx           |
| /fail                 | src/app/fail/page.tsx              |
| /product/:id          | src/app/product/[id]/page.tsx      |
| /login                | src/app/login/page.tsx             |
| /myKfc                | src/app/myKfc/page.tsx             |
| /orderHistory         | src/app/orderHistory/page.tsx       |
| /category/:name       | src/app/category/[name]/page.tsx    |
| /cart                 | src/app/cart/page.tsx              |
| /delivery             | src/app/delivery/page.tsx          |

- [ ] Copy and adapt components to Next.js src/components
- [ ] Copy and adapt context files to Next.js src/context or src/utils
- [ ] Copy and adapt assets (images, etc.) to public/images or src/assets
- [ ] Migrate and refactor each page to Next.js src/app or src/pages
- [ ] Update package.json with missing dependencies
- [ ] Refactor code for Next.js compatibility (routing, imports, SSR/CSR)
- [ ] Test the migrated app in Next.js
- [ ] Polish UI/UX to match KFC look and feel
