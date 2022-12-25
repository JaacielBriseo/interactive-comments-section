import { useAppSelector } from "../../store"
import { LogoutButton } from "./LogoutButton"

export const Menu = () => {
    const {isMobileMenuOpen} = useAppSelector(state=>state.comments)
  return (
    <div className="absolute top-0 bottom-0 left-0 flex flex-col items-center w-full min-h-20 py-1 pt-40 space-y-3 text-lg text-white uppercase bg-opacity-75 bg-black">
        <h1>Profile</h1>
        <LogoutButton/>
    </div>
  )
}
