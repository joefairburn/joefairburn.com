import { useStep } from "./StepsProvider";

export const StepHeader = () => {
	const { steps, currentStepIndex } = useStep();

	return (
		<h2 className="text-2xl font-bold">{steps[currentStepIndex].header}</h2>
	);
};
