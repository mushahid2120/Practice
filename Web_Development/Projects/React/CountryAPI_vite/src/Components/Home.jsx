import ContriesList from "./ContriesList";
import Search from "./Search";
import Filter from "./Filter";


export default function Home() {
  return (
    <>
      <div className={`main-container-all-contries`}>
        <main className="main-content-all-contries">
          <section className="search-filter">
            <Search />
            <Filter />
          </section>
          <ContriesList />
        </main>
      </div>
    </>
  );
}
