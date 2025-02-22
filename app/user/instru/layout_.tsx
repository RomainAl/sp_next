import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="/">0</PaginationLink>
            <PaginationLink href="/user/instru?n=0">Instru0</PaginationLink>
            <PaginationLink href="/user/instru?n=1">Instru1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <main>{children}</main>
    </>
  );
}
