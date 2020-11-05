import React from 'react'

const ProjectPage = () => {
  // Hente alle projecter fra db ProjectService.getAll()

  return (
    <div>
      <ul>
        <li>
          Project 1<br />
          <a href="/projects/1/invoice">Invoice</a>
          <br />
          <a href="/projects/1/edit">Edit</a>
          <br />
          <a href="/projects/1/delete">Invoice</a>
          <br />
        </li>
        <li>
          Project 2 <button>Invoice</button>
        </li>
      </ul>
    </div>
  )
}

export default ProjectPage
