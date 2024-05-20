// 'use client';

// import AddressList from '@components/addresses/AddressList';
// import PageLayout from '@components/layout/PageLayout';
// import SpaceActionsMenu from '@components/spaces/SpaceActionsMenu';
// import { ROUTES } from '@constants/routes.const';
// import { Button } from '@core/ui/Button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@core/ui/Tab';
// import { ADDRESS_TYPE } from '@models/address';
// import { Space } from '@models/space';
// import { addressFormState } from '@states/address-form.atom';
// import { spacesState } from '@states/spaces.atom';
// import { getCreateAddressURL } from '@utils/navigation';
// import { NextPage } from 'next';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useRecoilValue, useSetRecoilState } from 'recoil';

// interface VaultDetailPageProps {
//   params: { spaceId: string };
// }

// const VaultDetailPage: NextPage<VaultDetailPageProps> = ({ params }) => {
//   const [space, setSpace] = useState<Space | null>(null);
//   const [addressType, setAddressType] = useState<ADDRESS_TYPE>(
//     ADDRESS_TYPE.CRYPTO
//   );

//   const router = useRouter();

//   const spacesData = useRecoilValue(spacesState);
//   const setAddressForm = useSetRecoilState(addressFormState);

//   const { spaceId } = params;

//   useEffect(() => {
//     if (!spaceId) return;

//     const selectedSpace = spacesData.find((space) => space.id === spaceId);

//     if (!selectedSpace) {
//       router.push(ROUTES.APP);
//       return;
//     }

//     setSpace(selectedSpace);
//   }, [spacesData, router, spaceId]);

//   const handleChange = (newValue: string) => {
//     setAddressType(newValue as ADDRESS_TYPE);
//   };

//   const handleCreateAddress = () => {
//     setAddressForm((currentValue) => ({
//       ...currentValue,
//       action: 'CREATE',
//     }));

//     router.push(getCreateAddressURL(space?.id || '', addressType));
//   };

//   return (
//     <PageLayout title={space?.name || 'Loading...'} backPath={ROUTES.APP}>
//       <Button variant="ghost" onClick={handleCreateAddress}>
//         + Add Address
//       </Button>

//       <SpaceActionsMenu space={space!} />

//       <Tabs defaultValue={ADDRESS_TYPE.CRYPTO} onValueChange={handleChange}>
//         <TabsList className="mb-4 grid h-full w-full grid-cols-2">
//           <TabsTrigger value={ADDRESS_TYPE.CRYPTO}>
//             {`Crypto Accounts (${space?.cryptoAddresses?.length || 0})`}
//           </TabsTrigger>

//           <TabsTrigger value={ADDRESS_TYPE.FIAT}>
//             {`Bank Accounts (${space?.fiatAddresses?.length || 0})`}
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value={ADDRESS_TYPE.CRYPTO}>
//           <AddressList
//             spaceId={space?.id || ''}
//             addresses={space?.cryptoAddresses || []}
//             addressType={ADDRESS_TYPE.CRYPTO}
//             onClick={handleCreateAddress}
//           />
//         </TabsContent>

//         <TabsContent value={ADDRESS_TYPE.FIAT}>
//           <AddressList
//             spaceId={space?.id || ''}
//             addresses={space?.fiatAddresses || []}
//             addressType={ADDRESS_TYPE.FIAT}
//             onClick={handleCreateAddress}
//           />
//         </TabsContent>
//       </Tabs>
//     </PageLayout>
//   );
// };

// export default VaultDetailPage;
