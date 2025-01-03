import { useSelector } from "react-redux";
import DrawerAppBar from "../components/layout/MainLayout2.component";

export default function SharedLayout() {
  const { user } = useSelector((store: any) => store.user);

  return (
    <DrawerAppBar />
  );
}
