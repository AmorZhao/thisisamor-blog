import Link from "next/link";

interface DropdownMenuProps {
    title: string;
    items: { label: string; href: string }[];
    currentPage?: string; 
}

const DropdownMenu = ({ title, items, currentPage }: DropdownMenuProps) => {
    return (
        <div className="relative group">
            <Link href="/blog" className={`${currentPage === title ? "underline text-blue-300" : ""} hover:underline`}>
                {title}
            </Link>
    
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:flex group-hover:flex-col gap-2 bg-gray-800 bg-opacity-75 shadow-lg p-3 rounded w-auto min-w-[100px] pointer-events-auto">
                {items.map((item, index) => (
                    <Link 
                        key={index} 
                        href={item.href} 
                        className="text-gray-300 text-sm hover:text-gray-100 whitespace-nowrap text-center"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
    
};

export default DropdownMenu;
