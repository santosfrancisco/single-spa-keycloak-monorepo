import * as SC from "./styles";

export type ListItem = {
  id: string;
  renderComponent?: (item: ListItem) => JSX.Element;
  value?: any;
  [key: string]: unknown;
};

type ListProps<T extends ListItem> = {
  items?: T[];
  handleClick?: (item: T) => void;
};

export const List = <T extends ListItem>({
  items = [],
  handleClick,
  ...attrs
}: ListProps<T>) => {
  return (
    <SC.ListContainer>
      {items &&
        items.map((item, index) => (
          <SC.ListItem
            {...attrs}
            key={index}
            id={item.id}
            onClick={() => handleClick?.(item)}
          >
            {item.renderComponent ? item.renderComponent(item) : item.value}
          </SC.ListItem>
        ))}
    </SC.ListContainer>
  );
};
