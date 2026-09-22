import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { EngineeringStats } from "@/components/EngineeringStats";
import { Expertise } from "@/components/Expertise";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Tools } from "@/components/Tools";

export default function Home() {
  return (
    <>
      <Hero />
      <EngineeringStats />
      <Projects />
      <Expertise />
      <Process />
      <About />
      <Tools />
      <Contact />
    </>
  );
}
