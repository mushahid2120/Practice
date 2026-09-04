import java.util.*;

public class SetMap {
    public static void main(String args[]){
        // Set<Integer> s=new HashSet<>();
        // boolean isAdd32=s.add(32);
        // boolean isAdd32Again=s.add(32);
        // System.out.println(isAdd32+"==="+isAdd32Again);
        // TreeSet<Integer> tset = new TreeSet<>(List.of(3,22,222,23,23,23,23,23,23,32,1,14,4,223,3));
        // System.out.println(tset.first());
        // System.out.println(tset.last());
        // System.out.println(tset.headSet(223,true));
        // System.out.println(tset.tailSet(100));
        // System.out.println(tset.lower(32));
        // System.out.println(tset.floor(32));
        // System.out.println(tset.higher(222));
        // System.out.println(tset.ceiling(222));
        // System.out.println(tset.pollFirst());
        // System.out.println(tset.pollLast());
        // System.out.println(tset);
        // System.out.println(tset.descendingSet());
        Map<String,Integer> map=new HashMap<>();
        map.put("Mushahid",24);
        map.put("Rohit",21);
        map.put("Vikas",20);
        System.out.println(map);
        System.out.println(map.containsKey("Mushahid"));
        System.out.println(map.containsValue(21));
        System.out.println(map.get("Mushahid"));
        System.out.println(map.remove("Mushahid"));
        Map<String,String> newmap=Map.of("Mushahid","Dhanbad","Rohit","West Bengal");
        // newmap.put("Raju","Bokaro");
        // map.clear();
        // Set<String> set=map.keySet();
        // Collection<String> c=newmap.values(); 
        // Set<Map.Entry<String,Integer>> entries=map.entrySet();
        // for(Map.Entry<String,Integer> e:entries){
        //     System.out.println(e);
        // }
        // System.out.println(entries);

        // Integer result=map.getOrDefault("Vikas", null);
        // System.out.println(map.putIfAbsent("Vikas", 32));
        // // map.remove("Rohit",2);
        // map.replace("Rohit", 21,40);
        
        // System.out.println(map);

        TreeMap<Integer,String> tmap=new TreeMap<>(Map.of(40,"Md",32,"Ansari"));
        System.out.print(tmap.lastKey());
        System.out.println(tmap.headMap(32,true));
        System.out.println(tmap.subMap(21, 33));
    } 
}
