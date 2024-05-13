import { useOutsideClick } from "../../lib/hooks";
import { store } from "../../lib/state";
import { AnimatePresence, motion } from "framer-motion";
import "../../styles/modal.css";

export default () => {
  const ref = useOutsideClick(() => {
    store.update(() => ({ modal: { component: null, isOpen: false } }));
  });

  const { component, isOpen } = store.useListen((e) => e.modal);

  return (
    <AnimatePresence>
      {isOpen && component && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="container" ref={ref}>
            {component}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
