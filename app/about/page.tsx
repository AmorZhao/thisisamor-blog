import Header from "../components/Header";

export default function About() {
  return (
    <div>
      <Header currentPage="about" />
      <div className="flex flex-1">
        <main className="p-8">
          <h1 className="text-2xl font-bold mb-4">About | 关于</h1>
            <p>Hi! This is Amor.</p>
            <br />
            <div className="mb-4">
              <div>
                <a href="https://github.com/AmorZhao"><i  className="fab fa-github"></i> GitHub</a>
              </div>
              <div>
                <a href="https://instagram.com/amor.zh39/"><i className="fab fa-instagram"></i> Instagram</a>
              </div>
              <div>
                <a href="mailto:amor_7303@163.com"><i className="far fa-envelope"></i> Email</a>
              </div>
              <div>
                <a href="https://amor-zhao.notion.site/Amor-s-Dashboard-33d838340d45480980835d213c19ea5a"><i className="fa-solid fa-n"></i> Notion Dashboard</a>
              </div>
            </div>
            <br/>
          <h1 className="text-2xl font-bold mb-4">Friends | 友链</h1>
            <p>
              <span title="You'll be able to visit it when she finally sets it up someday"><i className="fa-regular fa-heart"></i> Daisy&apos;s homepage</span>
            </p>
        </main>
      </div>
    </div>
  );
}