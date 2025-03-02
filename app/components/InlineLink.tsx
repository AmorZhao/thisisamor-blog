interface InlineLinkProps {
  href: string;
  text: string;
  underlineOnHover?: boolean;
  icon?: string;
}

const InlineLink = ({ href, text, underlineOnHover, icon }: InlineLinkProps) => {
  return (
    <div className={underlineOnHover ? 'hover:underline' : ''} >
        <a href={href}><i className={`${icon}}`}></i> {text}</a>
    </div>
  );
};

export default InlineLink;
