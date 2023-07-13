import { FC } from 'react';
import styles from './ActionButton.module.scss';

interface IActionButtonProps {
    actionHandler: () => void;
    isActionAvailable: boolean;
}

export const ActionButton: FC<IActionButtonProps> = (props) => {
    const { actionHandler, isActionAvailable } = props;

    return (
        <div className={styles.btnContainer}>
            {isActionAvailable ? (
                <button className={styles.btnSwap} onClick={actionHandler}>
                    Swap Faces
                </button>
            ) : (
                <button className={styles.btnSwap}>Swap Faces</button>
            )}
        </div>
    );
};
