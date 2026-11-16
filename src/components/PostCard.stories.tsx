import type { Meta, StoryObj } from "@storybook/react-vite";
import PostCard from "./PostCard";

const meta = {
  title: "Components/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
  args: {
    post: {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortContent: Story = {
  args: {
    post: { userId: 3, id: 42, title: "Tiêu đề ngắn", body: "Nội dung ngắn." },
  },
};
