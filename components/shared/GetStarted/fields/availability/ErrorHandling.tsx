export default function ErrorMessage({ hasError }: { hasError: boolean }) {
  return hasError ? (
    <span className="text-red-500">Please ensure all times are properly set</span>
  ) : null;
}
