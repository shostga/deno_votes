import { useSignal } from "@preact/signals";

interface ButtonProps {
  questionId: string;
  votes: number;
  option: string;
  optionNumber: number;
}

export default function Button({
  questionId,
  option,
  votes,
  optionNumber,
}: ButtonProps) {
  const loading = useSignal(false);
  const votesSignal = useSignal(votes);
  const onClick = () => {
    loading.value = true;
    const res = await fetch(
      `/api/vote?id=${questionId}&option=${optionNumber}`,
      { method: "POST" }
    );
    if (res.ok) {
      loading.value = false;
      votesSignal.value = votesSignal.value + 1;
    }
    // setTimeout(() => {
    //   loading.value = false;
    //   votesSignal.value = votesSignal.value + 1;
    // }, 1500);
  };
  return (
    <button
      onClick={onClick}
      class=" w-full bg-gray-800 text-white text-xl rounded-md mb-2 p-2"
    >
      {loading.value ? "Loading..." : `${option} (${votesSignal.value})`}
    </button>
  );
}
