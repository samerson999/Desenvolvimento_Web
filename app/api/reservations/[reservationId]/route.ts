import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/GetCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { reservationId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reservationId } = params;
  
  try {
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } }
        ]
      }
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
