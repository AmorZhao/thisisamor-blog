interface BlogPreviewProps {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  link: string;
}

const BlogPreview = ({ title, description, date, category, tags, link }: BlogPreviewProps) => {
  return (
    <div className="mb-8 border custom-border rounded-lg p-4">
      <a href={`/blog/${link}`} className="text-xl font-bold mb-3 hover:underline">{title}</a>
      <div className="flex items-center space-x-8 ml-1 mt-1 text-sm custom-gray">
      <p><i className="fa-solid fa-calendar"></i> {new Date(date).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "medium" })}</p>
      <p><i className="fa-solid fa-folder-closed"></i> {category}</p>
      </div>
      <p className="line-clamp-2 ml-1 custom-gray mt-2">{description}</p>
      <div className="ml-1">
      {tags.map((tag, index) => (
        <span key={index} className="text-xs custom-blue mr-2 mt-1">#{tag}</span>
      ))}
      </div>
    </div>
  );
};
  
export default BlogPreview;