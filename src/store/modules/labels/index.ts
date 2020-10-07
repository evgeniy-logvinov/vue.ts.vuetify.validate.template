import { Module, ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import LabelsState from '@/entities/states/LabelsState';
import LabelService from '@/services/LabelService';
import LabelEntity from '@/entities/LabelEntity';

const state = (): LabelsState => ({
  labels: [],
});

const actions: any = {
  async getLabels(context: ActionContext<LabelsState, RootState>) {
    const labels = await LabelService.get();

    context.commit('setLabels', labels);
  },
};

const mutations = {
  setLabels(currentState: LabelsState, labels: LabelEntity[]): void {
    currentState.labels = labels;
  },
};

const namespaced = true;

const labels: Module<LabelsState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default labels;
