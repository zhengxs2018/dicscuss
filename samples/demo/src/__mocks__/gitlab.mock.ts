/* eslint-disable import/no-extraneous-dependencies */
import Mock from 'mockjs'

import userData from './data/gitlab.user.data.json'
import projectData from './data/gitlab.project.data.json'
import notesData from './data/gitlab.notes.data.json'

const BASE_URL = `${import.meta.env.VITE_APP_GITLAB_BASE_URL}/api/v4`

Mock.mock(`${BASE_URL}/user`, () => userData)

Mock.mock(`${BASE_URL}/projects/375`, () => projectData)

Mock.mock(`${BASE_URL}/projects/375/issues/1`, () => projectData)

Mock.mock(
  `${BASE_URL}/projects/375/issues/1/notes?page=1&per_page=10&order_by=created_at&sort=desc`,
  () => notesData,
)
