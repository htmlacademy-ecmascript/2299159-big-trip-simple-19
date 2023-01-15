import Presenter from './presenter';
import {sortCallbackMap, sortTitleMap} from '../maps';
import {findKey} from '../utils';

/**,
 * @extends {Presenter<SortView>},
 */
export default class SortPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const sorts = Object.entries(sortTitleMap).map(([value, title]) => ({value, title}));

    this.view.setOptions(sorts);

    //при первом запуске
    this.updateViewValue();

    this.view.addEventListener('change', this.handleViewChange.bind(this));
  }

  updateViewValue() {
    const sort = this.pointsModel.getSort();

    const sortType = findKey(sortCallbackMap, sort);

    //console.log(sortType)

    this.view.setValue(sortType);
  }

  handleViewChange() {
    const sortType = this.view.getValue();

    //console.log(sortType)

    this.pointsModel.setSort(sortCallbackMap[sortType]);
  }
}