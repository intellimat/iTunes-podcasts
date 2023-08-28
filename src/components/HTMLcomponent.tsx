import DOMPurify from "dompurify";
interface Props {
  htmlString: string;
}

export default function HTMLComponent({ htmlString }: Props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlString) }} />
  );
}
