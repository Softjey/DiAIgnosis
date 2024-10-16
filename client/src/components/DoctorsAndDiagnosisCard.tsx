import { Card, CardBody, RadioGroup, Radio } from "@nextui-org/react";
import React, { useState } from "react";
import InputGroup from "./InputGroup";

export interface Props {
  initialDiagnoses: string[];
  initialDoctors: string[];
}

export const DoctorsAndDiagnosisCard: React.FC<Props> = ({ initialDiagnoses, initialDoctors }) => {
  const [diagnoses, setDiagnoses] = useState(initialDiagnoses);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [diagnosisInput, setDiagnosisInput] = useState("");
  const [doctorInput, setDoctorInput] = useState("");

  return (
    <Card>
      <CardBody className="flex flex-row justify-evenly suggestions-card-body">
        <RadioGroup label="Possible diagnoses">
          {diagnoses.map((diagnosis) => (
            <Radio key={diagnosis} value={diagnosis}>
              {diagnosis}
            </Radio>
          ))}

          <InputGroup
            inputValue={diagnosisInput}
            setInputValue={setDiagnosisInput}
            setValue={setDiagnoses}
          />
        </RadioGroup>

        <RadioGroup label="Doctor suggestions">
          {doctors.map((doctorProfession) => (
            <Radio key={doctorProfession} value={doctorProfession}>
              {doctorProfession}
            </Radio>
          ))}

          <InputGroup
            inputValue={doctorInput}
            setInputValue={setDoctorInput}
            setValue={setDoctors}
          />
        </RadioGroup>
      </CardBody>
    </Card>
  );
};
