import java.util.*;

public class StackQueue {
    public static void main(String args[]){
        // Queue<Integer> queue=new ArrayDeque<>();
        // queue.add(32);
        // queue.offer(31);
        // System.out.println(queue.peek());
        // System.out.println(queue.element());
        // System.out.println(queue.remove());
        // System.out.println(queue.poll());
        // System.out.println(queue.poll());

        // Deque<Integer> deque = new ArrayDeque<>();
        // deque.addFirst(21);
        // deque.addFirst(90);
        // deque.addLast(98);
        // deque.addLast(80);
        // deque.offerLast(12);
        // deque.removeFirst();
        // deque.removeLast();
        // // System.out.println(deque.peekLast());
        // deque.push(66);
        // deque.push(100);
        
        // System.out.println();
        // System.out.println(deque);

        PriorityQueue<Integer> pq=new PriorityQueue<>();
        pq.add(32);
        pq.add(40);
        pq.add(90);
        pq.add(22);
        System.out.println(pq);
    }
}
