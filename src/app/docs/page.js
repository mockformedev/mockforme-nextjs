import Docs from "../components/Docs";

export default function Documentation() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="center">
          <img
            src="https://www.mockforme.com/assets/images/logo.png"
            alt="MockForMe logo"
            width={180}
            height={38}
            className="center"
          />
          <div className="tag-line">Simplest way to mock your apis.</div>
        </div>
        <div className="gap-[15px] grid sm:grid-cols-1 md:grid-cols-12 mt-5 docs">
          <div className="left sm:col-span-12 md:col-span-8">
            <Docs />
          </div>
          <div className="right sm:col-span-12 md:col-span-4 bg-docs">
            <h2>Key Takeaways</h2>
            <hr className="mb-5" />
            <h3>Integrate mockforme Client side and server side</h3>

            <div className="steps mt-5">
              <h4 className="text-uppercase">Installation</h4>
              <div className="sub-steps">
                <div className="highlight">
                  <code>npm install mockforme --save-dev</code>
                </div>
              </div>
            </div>
            <div className="steps mt-5">
              <h4 className="text-uppercase">
                Import package Server side & initialisation
              </h4>
              <div className="highlight">
                <pre>
                  <code>{`
import { mockforme } from "mockforme/sever";

mockforme("ACCESS_TOKEN").run((mockedApis) => {
  console.log("mockedApis", mockedApis);
})
`}</code>
                </pre>
              </div>
            </div>
            <div className="steps mt-5">
              <h4 className="text-uppercase">
                Import package Client side & initialisation
              </h4>
              <div className="highlight">
                <pre>
                  <code>{`
import { mockforme } from "mockforme";

mockforme().run();
`}</code>
                </pre>
              </div>
            </div>
            <hr className="mt-5" />
            <div className="steps mt-5">
              <h4 className="text-uppercase">
                JSON Sample Data for APIs
              </h4>
              <div className="mt-2">
                <a href="https://github.com/mockformedev/mockforme-nextjs/blob/master/products.json" target="_blank">
                  <code className="inline-highlight">/products</code> [Product API JSON data]
                </a>
              </div>
              <div>
                <a href="https://github.com/mockformedev/mockforme-nextjs/blob/master/cart.json" target="_blank">
                  <code className="inline-highlight">/cart</code> [Cart API JSON data]
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
