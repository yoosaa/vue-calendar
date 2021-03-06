import axios from 'axios';
import { serializeCalendar } from '../../functions/serializers';

const state = {
    calendars: [],
    calendar: null,
};

const getters = {
    calendars: (state) => state.calendars.map((calendar) => serializeCalendar(calendar)),
};

const mutations = {
    setCalendars: (state, calendars) => (state.calendars = calendars),
    appendCalendar: (state, calendar) => (state.calendars = [...state.calendars, calendar]),
    updateCalendar: (state, calendar) =>
        (state.calendars = state.calendars.map((c) => (c.id === calendar.id ? calendar : c))),
    setCalendar: (state, calendar) => (state.calendar = calendar),
};

const actions = {
    async fetchCalendars({ commit }) {
        const response = await axios.get('/api/calendars');
        commit('setCalendars', response.data);
    },
    async createCalendar({ commit }, calendar) {
        const response = await axios.post('/api/calendars', calendar);
        commit('appendCalendar', response.data);
    },
    async updateCalendar({ commit }, calendar) {
        const response = await axios.put(`/api/calendars/${calendar.id}`, calendar);
        commit('updateCalendar', response.data);
    },
    async deleteCalendar({ commit }, id) {
        const response = await axios.delete(`/api/calendars/${id}`);
        commit('removeCalendar', response.data);
    },
    setCalendar({ commit }, calendar) {
        commit('setCalendar', calendar);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
