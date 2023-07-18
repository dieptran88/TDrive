import { Button } from '@atoms/button/button';
import { useOnBuildContextMenu,
    useOnBuildFileTypeContextMenu,
    useOnBuildPeopleContextMenu,
    useOnBuildDateContextMenu,
    useOnBuildDateCreationContextMenu,
    useOnBuildSortingContextMenu, } from "../../context-menu";
import Languages from "app/features/global/services/languages-service";
import { atom, useRecoilState } from "recoil";
import { SharedWithMeFilterState } from '@features/drive/state/shared-with-me-filter';
import { ChevronDownIcon } from "@heroicons/react/outline";
import MenusManager from '@components/menus/menus-manager.jsx';
import { Modal, ModalContent } from '@atoms/modal';

export type ChooseFilterModalType = {
    open: boolean;
};
  
export const ChooseFilterModalAtom = atom<ChooseFilterModalType>({
key: 'ChooseFilterModalAtom',
default: {
    open: false,
},
});
  
export const ChooseFilter = () => {
    const [state, setState] = useRecoilState(ChooseFilterModalAtom);
    const [filter, setFilter] = useRecoilState(SharedWithMeFilterState);
    const buildFileTypeContextMenu = useOnBuildFileTypeContextMenu();
    const buildPeopleContextMen = useOnBuildPeopleContextMenu();
    const buildDateContextMenu = useOnBuildDateContextMenu();
    const buildDateCreationContextMenu = useOnBuildDateCreationContextMenu()
    const buildSortingContextMenu = useOnBuildSortingContextMenu()
    return ( 
        <div className='flex items-center'>
            <Modal open={state.open} onClose={() => setState({ ...state, open: false })}>
                <div className="text-lg font-semibold block text-zinc-900 dark:text-white pr-8 overflow-hidden text-ellipsis">{Languages.t("scenes.app.shared_with_me.filter")}</div>
                <div className="flex flex-col items-center space-y-10 mt-4 mb-6">
                    <div className="">
                        <Button
                        theme="secondary"
                        className="flex items-center"
                        onClick={evt => {
                        MenusManager.openMenu(
                            buildFileTypeContextMenu(),
                            { x: evt.clientX, y: evt.clientY },
                            'center',
                        );
                        }}
                        >
                        <span>
                            {filter.mimeType.key && filter.mimeType.value != 'All'
                                ? filter.mimeType.key
                                : Languages.t('scenes.app.shared_with_me.file_type')}
                        </span>
                        <ChevronDownIcon className="h-4 w-4 ml-2 -mr-1" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            theme="secondary"
                            className="flex items-center"
                            onClick={evt => {
                            MenusManager.openMenu(
                                buildDateContextMenu(),
                                { x: evt.clientX, y: evt.clientY },
                                'center',
                            );
                            }}
                        >
                            <span>
                            {filter.date.key && filter.date.key != 'All'
                                ? filter.date.key
                                : Languages.t('scenes.app.shared_with_me.last_modified')}
                            </span>
                            <ChevronDownIcon className="h-4 w-4 ml-2 -mr-1" />
                        </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Button
                            theme="secondary"
                            className="flex items-center"
                            onClick={evt => {
                            MenusManager.openMenu(
                                buildDateCreationContextMenu(),
                                { x: evt.clientX, y: evt.clientY },
                                'center',
                            );
                            }}
                        >
                            <span>
                            {filter.dateCreation.key && filter.dateCreation.key != 'All'
                                ? filter.dateCreation.key
                                : Languages.t('scenes.app.shared_with_me.last_created')}
                            </span>
                            <ChevronDownIcon className="h-4 w-4 ml-2 -mr-1" />
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};