import LabelBottomNavigation from "@/components/layout/BottomNavigation.component";
import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import DrawerAppBar from "../components/layout/MainLayout2.component";

export default function SharedLayout() {

  console.log(useDeviceDetection().isMobileDevice)
  return (
    <>
      {
        useDeviceDetection().isMobileDevice
          ? <LabelBottomNavigation />
          : <DrawerAppBar />
      }
    </>
  );
}
