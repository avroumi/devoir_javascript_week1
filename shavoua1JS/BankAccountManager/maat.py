world = "Hello world!"

clean = "".join([world for world in world if world != " " ])

def different(str_world):
    clean = list(str_world)
    for n in range(0, len(clean) -1, 2) :
        clean[n],clean[n+1] = clean[n+1], clean[n]
        
    return "".join(clean[::-1]) 
    


    
print(different(clean))

print (clean)