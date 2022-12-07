import RoundImageButton from "./RoundImageButton";

const Sidebar = () => {
  return (
    <nav className="flex min-h-full min-w-[100px] bg-slate-100 flex-col pt-4 space-y-4 items-center">
      <RoundImageButton
        src="/assets/images/boredape.png"
        slug="boredape"
        sidebar
      />
      <RoundImageButton
        src="/assets/images/doodles.jpg"
        slug="doodle"
        sidebar
      />
      <RoundImageButton src="/assets/images/clonex.png" slug="clonex" sidebar />
      <RoundImageButton
        src="/assets/images/mevarmy.gif"
        slug="mevarmy"
        sidebar
      />
    </nav>
  );
};

export default Sidebar;
