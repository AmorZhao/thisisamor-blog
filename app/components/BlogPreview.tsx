interface BlogPreviewProps {
    title: string;
    content: string;
}

const BlogPreview = ({ title, content }: BlogPreviewProps) => {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="line-clamp-2">{content}</p>
      </div>
    );
  };
  
export default BlogPreview;