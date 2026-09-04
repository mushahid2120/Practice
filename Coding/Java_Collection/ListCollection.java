import java.util.*;

public class ListCollection {
    public static void main(String args[]){
        // List<Integer> li=new LinkedList<>();
        List<Integer> list=Arrays.asList(3,2,42,2);
        List<Integer> l=List.of(2,32,21,2,2); //Immutable 
        int result=list.get(2);
        System.out.println(result);
        li.add(0,33);
        // Integer isSet=li.set(4,12); 
        li.addAll(List.of(3,32,21,1));
        // l.add(32);
        // int removedItem=li.remove(3);
        int inIndex=li.indexOf(32);
        System.out.print(li+"---"+inIndex);
        List<Integer> copyList=List.copyOf(li); //Immutable
        // copyList.add(22); //Immutable
        System.out.println("copyList= "+copyList);
        // ListIterator<Integer> it=li.listIterator(0);
        // Iterator<Integer> it=li.iterator();
        // while(it.hasNext()){
        //     int currentValue=it.next();
        //     System.out.println(currentValue);
        //     if(currentValue==32){
        //         it.remove();
        //     }
        // }
        // System.out.println(li);
        // List<Integer> ll=new ArrayList<>(10);
        // System.out.println("size="+ll.size());
    }
};

