import '@fortawesome/fontawesome-free/css/all.min.css';

const Y2KFooter = () => {
  return (
    <footer className="w-full font-noto text-center p-4 text-gray-400 text-sm mt-8">
      <p>&copy; {new Date().getFullYear()}  <i className="fa-solid fa-carrot"></i>  Amor Zhao</p>
    </footer>
  );
};

export default Y2KFooter;
