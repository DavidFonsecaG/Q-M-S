
const Navbar = () => {
  return (
    <nav className="flex justify-between px-3 font-bold tracking-wider">
        <div>
            <div className="text-2xl">
                <span>QMS</span>
            </div>
            <div className="text-[0.68rem] leading-none">
                <span>Queue Management System</span>
            </div>
        </div>
        <div className="text-red-600 text-[0.75rem] align-top pt-1">
            <span className="hover:underline hover:underline-offset-4">MENU</span>
        </div>
    </nav>
  )
};

export default Navbar;
