import { CouponProvider } from "@/components/hook/CouponContext";
import { CreditProvider } from "@/components/hook/creditContext";
import { DiscountProvider } from "@/components/hook/discountContext";
import Sidebar from "@/components/layout/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <CouponProvider>
          <DiscountProvider>
            <CreditProvider>{children}</CreditProvider>
          </DiscountProvider>
        </CouponProvider>
      </div>
    </div>
  );
}
