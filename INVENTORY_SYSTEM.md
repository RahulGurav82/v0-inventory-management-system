# Inventory Management System - Frontend Only

A modern warehouse inventory management system built with Next.js 15, React 19, and TypeScript. This is a **frontend-only application** designed to demonstrate a complete inventory management interface with authentication, navigation, and dashboard features.

## Features

### 🔐 Authentication
- **Store Location Selection**: Choose from 5 warehouse locations
  - Main Warehouse
  - Sanpada
  - Ghansoli
  - Nerul
  - Ulwe
- **Phone Number Verification**: Enter phone number to receive OTP
- **OTP Verification**: 6-box OTP input with auto-focus
- **Session Persistence**: Auth state saved in localStorage

### 📊 Dashboard
- **Welcome Card**: Location-based greeting
- **Key Metrics**: 
  - Total Products
  - Stock Value
  - Low Stock Items
  - Stock Transfers
- **Recent Activity Feed**: Real-time inventory operations
- **Quick Actions**: Fast access to common tasks
- **Warehouse Overview**: Capacity, turnover, and space metrics

### 📁 Comprehensive Navigation
The sidebar includes 13 main menu sections with 40+ sub-items:

#### Products
- Product List
- Add Product
- SKU List
- Categories
- Brands

#### Inventory
- Inventory Overview
- Batch Stock
- Low Stock Alerts
- Expiry Alerts
- Stock Ledger

#### Inward (Stock Entry)
- Purchase Inward
- Customer Return
- Adjustment Inward

#### Transfers
- Create Transfer
- Transfer List
- Pending Transfers
- Damaged Transfers

#### Reservations
- Active Reservations
- Expired Reservations
- Reservation Logs

#### Orders
- Ecommerce Orders
- POS Orders
- Returns & Refunds

#### Branches & Locations
- All Locations
- Add Location
- Location Inventory View

#### Vendors
- Vendor List
- Add Vendor
- Vendor Invoices

#### Members / Customers
- Customer List
- Memberships
- Return History

#### Reports
- Inventory Report
- Batch Report
- Transfer Report
- Sales Report
- Return Report

#### Settings
- Tax Settings
- Units & Measurement
- Roles & Permissions
- App Configuration

#### System / Logs
- Activity Logs
- Error Logs
- Job Queue Monitor

### 🎨 Design Features
- **Dark Theme**: Professional warehouse aesthetic with slate colors
- **Responsive Layout**: Works on desktop and mobile
- **Sidebar Navigation**: Collapsible menu with nested items
- **Header**: Location and user info with profile dropdown
- **Warehouse-themed Visuals**: Box and storage iconography
- **Gradients**: Subtle blue and emerald accents for data visualization

## Project Structure

```
/app
  /login
    page.tsx                 # Authentication page
  /dashboard
    layout.tsx              # Dashboard wrapper with sidebar
    page.tsx                # Main dashboard homepage
    /products
      page.tsx              # Products list
    /inventory
      page.tsx              # Inventory overview
    /transfers
      page.tsx              # Transfer management
    /reports/inventory
      page.tsx              # Inventory reports
    /[...slug]
      page.tsx              # Catch-all for all other pages
/components
  sidebar.tsx               # Navigation sidebar
  ui/*                      # shadcn/ui components
/context
  auth-context.tsx          # Authentication state management
```

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **React**: React 19 with hooks
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: localStorage for session persistence

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-system
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Usage

### Authentication Flow

1. **Select Location**: Choose your warehouse location from the dropdown
2. **Enter Phone**: Input your 10-digit phone number
3. **Send OTP**: Click "Send OTP" (simulated - any 6-digit code works)
4. **Verify OTP**: Enter the 6-digit OTP code (simulated verification)
5. **Access Dashboard**: Automatically redirected to the dashboard

### Demo Credentials

Since this is a frontend-only application, you can use any values:
- **Phone Number**: Any 10 digits (e.g., 9876543210)
- **OTP**: Any 6 digits (e.g., 123456)
- **Location**: Select from the provided options

### Navigation

- **Sidebar**: Click menu items to navigate to different sections
- **Nested Items**: Click chevron to expand/collapse submenu
- **Mobile**: Toggle sidebar with hamburger menu
- **Profile**: Click user icon in header for options

## Features in Detail

### Authentication Context

The `AuthProvider` manages:
- Current user state (phone, location)
- Authentication status
- Login/logout functionality
- localStorage persistence

```tsx
const { isAuthenticated, user, login, logout } = useAuth();
```

### Protected Routes

Dashboard pages automatically redirect unauthenticated users to login.

### Dynamic Navigation

Sidebar menu items:
- Show/hide based on authentication
- Highlight active route
- Support nested navigation
- Collapsible sections

### Responsive Design

- **Desktop**: Full sidebar always visible
- **Tablet**: Sidebar toggles with button
- **Mobile**: Sidebar slides in as overlay with backdrop

## Customization

### Add New Routes

1. Create page file: `/app/dashboard/new-page/page.tsx`
2. Add menu item to `MENU_ITEMS` in `components/sidebar.tsx`
3. Component will auto-appear in sidebar navigation

### Modify Menu Structure

Edit `MENU_ITEMS` array in `components/sidebar.tsx`:

```tsx
const MENU_ITEMS: MenuItem[] = [
  {
    id: 'custom',
    label: 'Custom Page',
    icon: <CustomIcon />,
    href: '/dashboard/custom',
  },
  // Add more items...
];
```

### Change Theme Colors

Update design tokens in `app/globals.css`:

```css
:root {
  --primary: oklch(0.48 0.23 251.6);
  --background: oklch(0.145 0 0);
  /* More tokens... */
}
```

## Frontend-Only Note

This application is designed for **frontend demonstration only**. To add real functionality:

1. **Authentication**: Connect to your backend auth service
2. **Database**: Integrate with a real database (Supabase, Neon, etc.)
3. **API Calls**: Replace mock data with actual API endpoints
4. **File Storage**: Add image/document uploads
5. **Real-time Updates**: Implement WebSockets for live data

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Server-side rendering for initial load
- Code splitting with dynamic imports
- Image optimization
- CSS minimization
- Tree-shaking for unused dependencies

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast colors
- Screen reader friendly

## License

This project is provided as-is for demonstration purposes.

## Support

For questions or issues, please refer to the code comments or create an issue in the repository.
