import { ResumeData } from "../types";
import Skills from "./skills/Skills";

interface SkillsProps {
  values: ResumeData;
}

const SkillsContainer = ({ values }: SkillsProps) => {
  return <Skills values={values} />;
};

export default SkillsContainer;