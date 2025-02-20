import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen p-4 flex flex-col items-center w-1/5">
      <div className="mb-6"></div>
      <Image
      src="/images/avatar.jpg"
      alt="Avatar"
      width={200}
      height={200}
      className="rounded-lg"
      />
      <p className="mt-4">Amorrrr</p>
    </aside>
  );
};

export default Sidebar;