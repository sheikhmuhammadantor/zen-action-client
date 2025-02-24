import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AddTask from "../../components/task/AddTask";

function Home() {

  return (
    <section className="container mx-auto">
      <Header />


      <section className="min-h-[70vh]">
        <AddTask />
      </section>


      <Footer />
    </section>
  )
}

export default Home;
