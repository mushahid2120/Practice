import java.util.*;

public class IterableInterface {
    public static void main(String[] args) {
     Collection<Integer> c=new ArrayList<>();
     c.add(32);
     c.add(40);
    //  Iterator<Integer> it=c.iterator();
    //  while(it.hasNext()){
    //     System.out.println(it.next());
    //  }
    //  for(int k:c){
    //     System.out.println(k);
    //  }
    //  System.out.println(c);
    // System.out.println(c.contains(40));
    // Collection<Integer> nc=List.of(3,2,21,3);
    // nc.add(22);
    Object []arr=c.toArray();
    // System.out.println(arr);
    // for(Object a:arr){
    //     System.out.println(a);
    // }
    boolean isRemove=c.remove(40);
    c.addAll(List.of(3,32,2,2));
    c.retainAll(List.of(2,1,23,3));
    System.out.println(c);
    }
}