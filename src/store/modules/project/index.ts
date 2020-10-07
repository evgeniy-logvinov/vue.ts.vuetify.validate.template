import { Module, ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import ProjectService from '@/services/ProjectService';
import ProjectState from '@/entities/states/ProjectsState';
import DetailProjectEntity from '@/entities/DetailProjectEntity';

const state = (): ProjectState => ({
  project: {
    id: 0,
    vacancy: [],
    created: '',
    description: '',
    labels: [],
    links: [],
    name: '',
    user: {
      id: '',
      email: '',
      fullName: '',
      location: '',
      contacts: [],
    },
  },
});

const actions: any = {
  async getProject(context: ActionContext<ProjectState, RootState>, id: number) {
    const project = await ProjectService.getById(id);

    context.commit('setProject', project);
  },
};

const mutations = {
  setProject(currentState: ProjectState, project: DetailProjectEntity): void {
    currentState.project = project;
  },
};

const namespaced = true;

const project: Module<ProjectState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default project;
