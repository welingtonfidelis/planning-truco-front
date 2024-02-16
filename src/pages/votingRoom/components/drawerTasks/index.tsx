import { useTranslation } from "react-i18next";
import { Drawer } from "../../../../components/drawer";
import { Props } from "./types";

export const DrawerTasks = (props: Props) => {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();

  const tasks = Array(20)
    .fill({ id: "", name: "", points: 0 })
    .map((item, index) => ({
      id: `a${index}`,
      name: `task_${index}`,
      points: 0,
    }));

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Test"
      onCloseButtonText={t("generic.button_exit")}
    >
      <>
        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <span>{task.name}</span>
            </div>
          );
        })}
      </>
    </Drawer>
  );
};
