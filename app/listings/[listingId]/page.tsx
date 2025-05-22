import getCurrentUser from "@/app/actions/GetCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId: string;
}

// CORRIGIDO: `params` agora é uma Promise
const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
  const { listingId } = await params;

  const listing = await getListingById({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
