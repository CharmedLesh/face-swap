import { FC } from 'react';
import { Arrows } from '../../../assets';
import styles from './ArrowsButton.module.scss';

interface IArrowsButtonProps {
    actionHandler: () => void;
    isActionAvailable: boolean;
}

export const ArrowsButton: FC<IArrowsButtonProps> = (props) => {
    const { actionHandler, isActionAvailable } = props;

    const onArrowsClickHandler = () => {
        if (isActionAvailable) {
            actionHandler();
        }
    };

    return (
        <div className={styles.arrowsContainer} onClick={onArrowsClickHandler}>
            <Arrows className={styles.arrowsIcon} />
        </div>
    );
};
