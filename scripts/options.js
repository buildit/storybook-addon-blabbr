const options = [
  {
    'name': 'Atom',
    'path': 'atoms',
  },
  {
    'name': 'Molecule',
    'path': 'molecules',
  },
  {
    'name': 'Organism',
    'path': 'organisms',
  },
  {
    'name': 'Template',
    'path': 'environments',
  },
];

const siteTypes = [
  {
    'name': '.COM',
    'path': 'com',
    'group': 'com-',
  },
  {
    'name': 'CHEF styleguide',
    'path': 'styleguide',
    'group': 'sg-',
  },
];

function getComponentTypes() {
  return options.map( item => { return item.name } );
}

function getComponentPath(componentType) {
  for( let i = 0; i < options.length; i++ ) {
    if( options[i].name === componentType ) {
      return options[i].path
    }
  }

  return null
}

function getSiteTypes() {
  return siteTypes.map( item => { return item.name } )
}

function getSourcePath(siteType) {
  for( let i = 0; i < siteTypes.length; i++ ) {
    if( siteTypes[i].name === siteType ) {
      return siteTypes[i].path
    }
  }

  return null
}

function getGroup(siteType) {
  for( let i = 0; i < siteTypes.length; i++ ) {
    if( siteTypes[i].name === siteType ) {
      return siteTypes[i].group
    }
  }

  return null
}

let projName = null
function setProjectName( projectName ) {
  projName = projectName
}
function getProjectName() {
  return projName
}

module.exports = {
  getComponentTypes,
  getComponentPath,
  setProjectName,
  getProjectName,
  getSiteTypes,
  getSourcePath,
  getGroup
}
