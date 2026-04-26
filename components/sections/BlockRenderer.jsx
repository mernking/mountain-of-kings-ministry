// components/BlockRenderer.jsx
import CodeBlock from "./blocks/CodeBlock";
import SchematicBlock from "./blocks/SchematicBlock";
import FormulaBlock from "./blocks/FormulaBlock";
import VideoBlock from "./blocks/VideoBlock";
import TextBlock from "./blocks/TextBlock";
import ImageBlock from "./blocks/ImageBlock";

export default function BlockRenderer({ content }) {
  return content.map((block, index) => {
    switch (block.type) {
      case "text":
        return (
          <p key={index} className="text-text/70 leading-loose mb-8">
            {block.value}
          </p>
        );

      case "schematic":
        return <SchematicBlock key={index} data={block} />;

      case "code":
        return <CodeBlock key={index} data={block} />;

      case "formula":
        return <FormulaBlock key={index} data={block} />;

      case "text":
        return <TextBlock key={index} data={block} />;
      case "image":
        return <ImageBlock key={index} data={block} />;
      case "video":
        return <VideoBlock key={index} data={block} />;

      default:
        return null;
    }
  });
}
