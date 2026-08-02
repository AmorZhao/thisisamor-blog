interface BlogPreviewProps {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  postType: string;
  link: string;
  hrefBase?: string;
}

const BlogPreview = ({ title, description, date, category, tags, postType, link, hrefBase = "/blog" }: BlogPreviewProps) => {
  if (postType === "posts") {
    return (
      <div className="mb-8 border border-grey-200 dark:border-grey-700 rounded-lg p-4 shadow-sm">
        <a href={`${hrefBase}/${postType}/${link}`} className="text-xl hover:underline">{title}</a>
        <div className="flex items-center space-x-8 ml-1 mt-3 text-sm text-grey-500 dark:text-grey-350 y2k:text-y2k-light-grey dark:y2k:text-y2k-dark-grey">
          <p><i className="fa-solid fa-calendar mr-2"></i>{new Date(date).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "medium" })}</p>
          <p><i className="fa-solid fa-folder-closed mr-2"></i>{category}</p>
        </div>
        <p className="line-clamp-2 ml-1 text-grey-500 dark:text-grey-350 y2k:text-y2k-light-grey dark:y2k:text-y2k-dark-grey mt-2">{description}</p>
        <div className="ml-1">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs text-blue-500 dark:text-blue-100 y2k:text-y2k-light-blue dark:y2k:text-y2k-dark-blue mr-2 mt-1">#{tag}</span>
          ))}
        </div>
      </div>
    );
  }
  else // diaries
  {
    return (
      <div className="mb-8 border border-grey-200 dark:border-grey-700 rounded-lg p-4 shadow-sm">
        <a href={`${hrefBase}/${postType}/${link}`} className="text-lg hover:underline">{title}</a>
        <div className="flex items-center space-x-8 ml-1 mt-3 text-sm text-grey-500 dark:text-grey-350 y2k:text-y2k-light-grey dark:y2k:text-y2k-dark-grey">
            <p><i className="fa-solid fa-calendar mr-2"></i>{new Date(date).toLocaleString("en-GB", { dateStyle: "short"})}</p>
        </div>
        <div className="ml-1 mt-1">
          {tags.map((tag, index) => (
            <span key={index} className="text-xs text-blue-500 dark:text-blue-100 y2k:text-y2k-light-blue dark:y2k:text-y2k-dark-blue mr-2 mt-1">#{tag}</span>
          ))}
        </div>
      </div>
    );
  }
};
  
export default BlogPreview;