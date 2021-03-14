#! /bin/python

'''
    Has to create:
        List of blocks, each containing: title + img
        Blocks can be expanded by clicking on them, revealing additional info
'''

import os, sys

projs = {}
for fn in os.listdir('.'):
    if fn.find('.xml') > 0:
        with open(fn, 'r') as f:
            s = ''
            for line in f.readlines():
                s += line
            p = {}
            for key in ['idx', 'img', 'title', 'text']:
                p[key] = s[s.find('<'+key+'>')+len('<'+key+'>'):s.find('</'+key+'>')]
        projs[p['idx']] = p

def escapenl(s):
    while s.find('\n') > -1:
        ix = s.find('\n')
        s = s[:ix] + '\\n' + s[ix+1:]
    return s
# create gen_projs.js
js = 'var projs = [];\nvar blockwidth = 512;\n\n'
js+= 'function onLoad() {\n'
r = 0; c = 0
for i in range(len(projs.keys())):
    if str(i) in projs:
        p = projs[str(i)]
        jsp = '\tvar p = document.createElement("div");\n'
        jsp+= '\tp.id = "p'+str(i)+'";\n'
        jsp+= '\tp.className = "proj_block";\n'
        html = "\t\t<img width=100% src='projects/" + p['img'] + "' alt='project image'>"
        html+= '\t\t<b>'+p['title']+'</b>'
        jsp+= '\tp.innerHTML = "'+html+'";\n'
        jsp+= '\tp.onclick = function click() {\n'
        jsp+= '\t\tvar pop = document.createElement("div");\n'
        jsp+= '\t\tpop.id = "popup";\n'
        jsp+= '\t\tpop.className = "overlay";\n'
        jsp+= '\t\tpop.innerHTML = "<b>'+p['title']+'</b><br>'
        jsp+= '\t\t\t'+escapenl(p['text'])+'";'
        jsp+= '\t\tsetTimeout(add_popup, 100, document.getElementById("pop_place"), pop);\n\t};\n'
        jsp+='\tprojs.push(p);\n\n'

        js += jsp
js+='\t set_projs();\n'
js+='};\n\n'

js+='function add_popup(p, c) {\n p.appendChild(c);\n};\n\n'

js+= 'function fill(cs) {\n'
js+= '\tconst prd = document.getElementById("proj");\n'
js+= '\twhile ( prd.firstChild ) {\n'
js+= '\t\tvar row = prd.lastChild;\n'
js+= '\t\twhile ( row.firstChild ) {\n'
js+= '\t\t\trow.removeChild(row.lastChild);\n'
js+= '\t\t}\n'
js+= '\t\tprd.removeChild(prd.lastChild);\n'
js+= '\t};\n\n'
js+= '\tvar c = 0; var i = 0;\n'
js+= '\tfor(i=0; i<projs.length; i++) {\n'
js+= '\t\tif(c == 0) {\n'
js+= '\t\t\tvar row = document.createElement("div");\n'
js+= '\t\t\trow.className="proj_row";\n'
js+= '\t\t};\n'
js+= '\t\trow.appendChild(projs[i]);\n'
js+= '\t\tc++;\n'
js+= '\t\tif(c==cs) {\n'
js+= '\t\t\tdocument.getElementById("proj").appendChild(row);\n'
js+= '\t\t\tc=0;\n'
js+= '\t\t};\n'
js+= '\t};\n'
js+= '\tif ( (c > 0) && (c<cs) ) {\n'
js+= '\t\tfor ( c; c<cs; c++ ) {\n'
js+= '\t\t\tvar empty=document.createElement("div");\n'
js+= '\t\t\tempty.className="proj_block";\n'
js+= '\t\t\tempty.style="border-color:white";\n'
js+= '\t\t\trow.appendChild(empty);\n'
js+= '\t\t};\n'
js+= '\t\tdocument.getElementById("proj").appendChild(row);\n'
js+= '\t};\n'
js+= '};\n\n'

js+= 'function set_projs() {\n'
js+= '\tvar w = window.innerWidth*.8;\n'
js+= '\tvar cs = Math.floor(w/blockwidth);\n'
js+= '\tfill(cs);\n'
js+= '};\n\n'

js+= 'window.addEventListener("click", function(e) {\n'
js+= '\tif(document.getElementById("popup").contains(e.target)) {\n'
js+= '\t} else {\n'
js+= '\t\tvar lst = document.getElementById("popup");\n'
js+= '\t\tdocument.getElementById("pop_place").removeChild(lst);\n'
js+= '\t};\n});\n'

with open('projs.js', 'w') as f:
    f.write(js)
