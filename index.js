var quickTemp = require('quick-temp')
var rsvp = require('rsvp')
var webpack = require('webpack')


function WebpackWriter(options){
  if (!(this instanceof WebpackWriter)){
    return new WebpackWriter(options)
  }

  var self = this
  var compiler = null

  options.output = options.output || {}
  
  function ensureCompiler(){
    if(compiler === null){
      quickTemp.makeOrReuse(self, 'tmpDestDir')
      options.output['path'] = self.tmpDestDir
      compiler = webpack(options)
    }
  }

  self.read = function(){
    // compiler needs a temporary directory for output, so we have to defer
    // it's instantiation until first build
    ensureCompiler()

    return new rsvp.Promise(function(resolve, reject){
      compiler.run(function(err, stats){
        if(err){  // fatal error
          reject(err)
          return
        }

        var jsonStats = stats.toJson()

        if(jsonStats.errors.length > 0){  // compilation errors
          jsonStats.errors.forEach(console.error)
          reject(jsonStats.errors)
          return
        }

        if(jsonStats.warnings.length > 0){ // just warnings, compilation was a success
          jsonStats.warnings.forEach(console.log)
        }

        resolve(self.tmpDestDir)
      })
    })
  }

  self.cleanup = function(){
    quickTemp.remove(self, 'tmpDestDir')
  }
}

module.exports = WebpackWriter
