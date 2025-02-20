interface BlogProps {
    title: string;
    content: string;
}

const Blog = ({ title, content }: BlogProps) => {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="line-clamp-2">{content}</p>
      </div>
    );
  };
  
export default Blog;